#include <runtime.h>

t_value *f_0x0(t_ref **closure) {
  // Logic
  function_call_0(closure[0]->value);
  // After
  return value_null;
}

t_value *module_load() {
  // Variables
  t_value *module = object_make_x(type_object, 1, 0x9F86D081884C7D65);
  t_variable *variables = module->data.object.variables;
  t_ref *__test = &(variables[0]);
  // Logic
  __test->value = function_make_x(type_function, &f_0x0, 1, __test);
  // After
  return module;
}

t_value *(*main_module)() = module_load
