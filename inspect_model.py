import tensorflow as tf
import sys

model_path = sys.argv[1]
interpreter = tf.lite.Interpreter(model_path=model_path)
interpreter.allocate_tensors()

print("Input Details:", interpreter.get_input_details())
print("Output Details:", interpreter.get_output_details())
