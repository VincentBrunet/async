#include <runtime.h>

t_value *f_0x0(t_ref **closure, t_value *__$0) {
  // Logic
  function_call_1(closure[0]->value, value_true);
  // After
  return value_null;
}

t_value *f_0x1(t_ref **closure) {
  // Logic
  function_call_2(closure[0]->value, value_true, closure[1]->value);
  // After
  return value_null;
}

t_value *module_load() {
  // Variables
  t_value *module = object_make_x(type_object, 3, -892396981, 97, 98);
  t_variable *variables = module->data.object.variables;
  t_ref *__stdout = &(variables[0]) /*-892396981*/;
  t_ref *__a = &(variables[1]) /*97*/;
  t_ref *__b = &(variables[2]) /*98*/;
  // Logic
  __stdout->value = number_i32_make(42);
  __a->value = function_make_x(type_function, &f_0x0, 1, __stdout);
  __b->value = function_make_x(type_function, &f_0x1, 2, __stdout, __a);
  function_call_0(__a->value);
  function_call_0(__b->value);
  // After
  return module;
}

t_value *(*main_module)() = module_load
