#include <runtime.h>

t_value *f_0x0(t_ref **closure, t_value *__a, t_value *__b) {
  // After
  return value_null;
}

t_value *f_0x1(t_ref **closure, t_value *__a, t_value *__b) {
  // After
  return value_null;
}

t_value *module_load() {
  // Variables
  t_value *module = object_make_x(type_object, 2, 0x31F7A65E315586AC, 0xEB0295D98F37AE9E);
  t_variable *variables = module->data.object.variables;
  t_ref *__toto = &(variables[0]);
  t_ref *__tutu = &(variables[1]);
  // Logic
  __toto->value = function_make_x(type_function, &f_0x0, 0);
  __tutu->value = function_make_x(type_function, &f_0x1, 0);
  // After
  return module;
}

t_value *(*main_module)() = module_load
