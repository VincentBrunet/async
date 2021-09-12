#include <runtime.h>

t_value *module_load() {
  // Variables
  t_value *module = object_make_x(type_object, 4, 0x18AC3E7343F01689, 0x2E7D2C03A9507AE2, 0x3E23E8160039594A, 0xCA978112CA1BBDCA);
  t_variable *variables = module->data.object.variables;
  t_ref *__d = &(variables[0]);
  t_ref *__c = &(variables[1]);
  t_ref *__b = &(variables[2]);
  t_ref *__a = &(variables[3]);
  // Logic
  __a->value = Or(Or(boolean_make(TRUE), boolean_make(FALSE)), boolean_make(FALSE));
  __b->value = And(Or(boolean_make(FALSE), boolean_make(FALSE)), boolean_make(TRUE));
  __c->value = Or(Equal(boolean_make(FALSE), boolean_make(TRUE)), Equal(boolean_make(TRUE), boolean_make(TRUE)));
  __d->value = Equal(Not(boolean_make(FALSE)), boolean_make(TRUE));
  // After
  return module;
}

t_value *(*main_module)() = module_load
