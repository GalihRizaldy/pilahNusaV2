import sys
import json
import os
import numpy as np
import tensorflow as tf

def main():
    try:
        if len(sys.argv) < 3:
            raise ValueError("Missing arguments. Usage: predict.py <model_path> <image_path>")
            
        model_path = sys.argv[1]
        image_path = sys.argv[2]
        
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model not found at {model_path}")
            
        if not os.path.exists(image_path):
            raise FileNotFoundError(f"Image not found at {image_path}")

        # Disable annoying TF logs
        os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3' 
        
        # Load TFLite model and allocate tensors.
        interpreter = tf.lite.Interpreter(model_path=model_path)
        interpreter.allocate_tensors()

        # Get input and output tensors.
        input_details = interpreter.get_input_details()
        output_details = interpreter.get_output_details()
        
        # Determine input shape expected by the model
        input_shape = input_details[0]['shape'] # e.g. [1, 224, 224, 3]
        height, width = input_shape[1], input_shape[2]

        # PREPROCESSING ALIGNED WITH COLAB (tf.io.decode_image, Bilinear, / 255.0)
        # Read file
        image_string = tf.io.read_file(image_path)
        # Decode image (ensuring 3 channels for RGB, ignoring Alpha)
        image = tf.io.decode_image(image_string, channels=3, expand_animations=False)
        # Cast to float32
        image = tf.cast(image, tf.float32)
        # Resize using Bilinear interpolation to exactly match Colab
        image = tf.image.resize(image, [height, width], method=tf.image.ResizeMethod.BILINEAR)
        # Normalize (rescale=1.0/255)
        image = image / 255.0
        
        # Add batch dimension
        input_data = tf.expand_dims(image, axis=0).numpy()

        # VERIFICATION: Print the first 5 values to stderr (so it doesn't break JSON stdout)
        # We flatten the tensor and take first 5 values
        flat_tensor = input_data.flatten()
        first_5_values = flat_tensor[:5].tolist()
        sys.stderr.write(f"VERIFICATION - First 5 tensor values: {first_5_values}\n")
        sys.stderr.flush()

        # Run inference
        interpreter.set_tensor(input_details[0]['index'], input_data)
        interpreter.invoke()

        # Get output
        output_data = interpreter.get_tensor(output_details[0]['index'])
        
        predictions = output_data[0]
        predicted_class_index = int(np.argmax(predictions))
        confidence = float(predictions[predicted_class_index])
        
        # Apply softmax if needed to get proper 0-100 percentage
        exp_preds = np.exp(predictions - np.max(predictions))
        softmax_preds = exp_preds / exp_preds.sum()
        confidence_softmax = float(softmax_preds[predicted_class_index])

        result = {
            "success": True,
            "class_index": predicted_class_index,
            "confidence": round(confidence_softmax * 100, 2),
            "raw_score": confidence
        }
        
        print(json.dumps(result))
        
    except Exception as e:
        error_result = {
            "success": False,
            "error": str(e)
        }
        print(json.dumps(error_result))
        sys.exit(1)

if __name__ == "__main__":
    main()
