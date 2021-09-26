#include <runtime.h>

t_value *f_0x0(t_ref **closure, t_value *__a, t_value *__b) {
  // After
  return null_make();
}

t_value *f_0x1(t_ref **closure, t_value *__a, t_value *__b) {
  // After
  return null_make();
}

t_value *f_0x2(t_ref **closure) {
  // After
  return null_make();
}

t_value *f_0x3(t_ref **closure) {
  // After
  return null_make();
}

t_value *module_load() {
  // Variables
  t_value *module = object_make_x(type_object, 4, 0x31F7A65E315586AC, 0xC2216749147EF551, 0xE4C2627889C58E60, 0xEB0295D98F37AE9E);
  t_variable *variables = module->data.object.variables;
  t_ref *__toto = &(variables[0]);
  t_ref *__tfunc1 = &(variables[1]);
  t_ref *__tfunc2 = &(variables[2]);
  t_ref *__tutu = &(variables[3]);
  // Logic
  __toto->value = function_make_x(type_function, &f_0x0, 0);
  __tutu->value = function_make_x(type_function, &f_0x1, 0);
  __tfunc1->value = function_make_x(type_function, &f_0x2, 0);
  __tfunc2->value = function_make_x(type_function, &f_0x3, 0);
  // After
  return module;
}

t_value *(*entry_module)() = module_load;
