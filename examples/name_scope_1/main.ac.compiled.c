#include <runtime.h>

t_value *f_0x0(t_ref **closure) {
  // Logic
  function_call_0(closure[0]->value);
  // After
  return value_null;
}

t_value *f_0x1(t_ref **closure) {
  // After
  return value_null;
}

t_value *module_load() {
  // Variables
  t_value *module = object_make_x(type_object, 2, 0x2CF24DBA5FB0A30E, 0x4FC75659C5DAF27D);
  t_variable *variables = module->data.object.variables;
  t_ref *__hello = &(variables[0]);
  t_ref *__dudu = &(variables[1]);
  // Logic
  __hello->value = function_make_x(type_function, &f_0x0, 1, __dudu);
  function_call_0(__hello->value);
  function_make_x(type_function, &f_0x1, 0);
  // After
  return module;
}

t_value *(*main_module)() = module_load
