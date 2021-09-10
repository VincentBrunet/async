#include <runtime.h>

t_value *f_0x0(t_ref **closure, t_value *__$0) {
  // Logic
  function_call_1(closure[0]->value, boolean_make(TRUE));
  // After
  return value_null;
}

t_value *f_0x1(t_ref **closure) {
  // Logic
  function_call_2(closure[0]->value, boolean_make(TRUE), closure[1]->value);
  // After
  return value_null;
}

t_value *module_load() {
  // Variables
  t_value *module = object_make_x(type_object, 3, 0x3E23E8160039594A, 0x63D42D26156FCC76, 0xCA978112CA1BBDCA);
  t_variable *variables = module->data.object.variables;
  t_ref *__b = &(variables[0]);
  t_ref *__stdout = &(variables[1]);
  t_ref *__a = &(variables[2]);
  // Logic
  __stdout->value = i32_make(42);
  __a->value = function_make_x(type_function, &f_0x0, 1, __stdout);
  __b->value = function_make_x(type_function, &f_0x1, 2, __stdout, __a);
  function_call_0(__a->value);
  function_call_0(__b->value);
  // After
  return module;
}

t_value *(*main_module)() = module_load
