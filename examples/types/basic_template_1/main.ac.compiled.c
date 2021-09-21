#include <runtime.h>

t_value *o_0x0(t_ref **closure) {
  // Variables
  t_value *object = object_make_x(type_object, 2, 0x3E23E8160039594A, 0xCA978112CA1BBDCA);
  t_variable *variables = object->data.object.variables;
  t_ref *__b = &(variables[0]);
  t_ref *__a = &(variables[1]);
  // Logic
  __a->value = i32_make(42);
  __b->value = i32_make(44);
  // After
  return object;
}

t_value *f_0x0(t_ref **closure) {
  // Logic
  return object_call_x(&o_0x0, 0);
  // After
  return null_make();
}

t_value *f_0x1(t_ref **closure) {
  // After
  return null_make();
}

t_value *module_load() {
  // Variables
  t_value *module = object_make_x(type_object, 2, 0x64104263853D745F, 0x9F3ABBE372AF6F7D);
  t_variable *variables = module->data.object.variables;
  t_ref *__myValue2 = &(variables[0]);
  t_ref *__myValue = &(variables[1]);
  // Logic
  __myValue->value = function_make_x(type_function, &f_0x0, 0);
  __myValue2->value = function_make_x(type_function, &f_0x1, 0);
  // After
  return module;
}

t_value *(*entry_module)() = module_load;
