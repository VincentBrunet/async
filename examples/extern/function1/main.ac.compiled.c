#include <runtime.h>

t_value *module_load() {
  // Variables
  t_value *module = object_make_x(type_object, 0);
  t_variable *variables = module->data.object.variables;
  // After
  return module;
}

t_value *(*entry_module)() = module_load;
