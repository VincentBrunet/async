#include "runtime.h"

t_value *module_load_0x333() {
  t_value *module_value = value_factory_object(3);
  t_variable *num = module_value->content.object.fields.items[0];
  t_variable *hello = module_value->content.object.fields.items[1];
  t_variable *world = module_value->content.object.fields.items[2];
}

