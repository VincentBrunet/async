#include <runtime.h>

t_value *module_load() {
  // Variables
  t_value *module = object_make_x(type_object, 4, 0x47C9BC32022403FC, 0x4E11BF4BB82F0078, 0xB699421AFFD7C815, 0xBEEC71C676C2DA06);
  t_variable *variables = module->data.object.variables;
  t_ref *__tIntAndDoubleAndFloat = &(variables[0]);
  t_ref *__tIntAndDouble = &(variables[1]);
  t_ref *__tIntOrDouble = &(variables[2]);
  t_ref *__tInt = &(variables[3]);
  // Logic
  __tInt->value = i32_make(42);
  __tIntOrDouble->value = i32_make(42);
  __tIntAndDouble->value = i32_make(42);
  __tIntAndDoubleAndFloat->value = i32_make(42);
  // After
  return module;
}

t_value *(*main_module)() = module_load
