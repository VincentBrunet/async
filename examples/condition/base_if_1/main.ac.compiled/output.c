#include <runtime.h>

t_value *f_0x0(t_ref **closure) {
  // Logic
  return boolean_make(TRUE);
  // After
  return null_make();
}

t_value *module_load() {
  // Variables
  t_value *module = object_make_x(type_object, 1, 0x31F7A65E315586AC);
  t_variable *variables = module->data.object.variables;
  t_ref *__toto = &(variables[0]);
  // Logic
  __toto->value = function_make_x(type_function, &f_0x0, 0);
  if (TO_BOOLEAN((boolean_make(TRUE)))) {
  return i32_make(42);
  }
  if (TO_BOOLEAN(boolean_make(FALSE))) {
  }
  if (TO_BOOLEAN(function_call_0(__toto->value))) {
  }
  // After
  return module;
}

t_value *(*entry_module)() = module_load;
