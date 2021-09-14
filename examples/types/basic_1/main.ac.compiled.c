#include <runtime.h>

t_value *module_load() {
  // Variables
  t_value *module = object_make_x(type_object, 2, 0xB699421AFFD7C815, 0xBEEC71C676C2DA06);
  t_variable *variables = module->data.object.variables;
  t_ref *__tIntOrDouble = &(variables[0]);
  t_ref *__tInt = &(variables[1]);
  // Logic
  __tInt->value = i32_make(42);
  __tIntOrDouble->value = i32_make(42);
  // After
  return module;
}

t_value *(*main_module)() = module_load
