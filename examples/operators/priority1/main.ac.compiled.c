#include <runtime.h>

t_value *module_load() {
  // Variables
  t_value *module = object_make_x(type_object, 13, 0x18AC3E7343F01689, 0x252F10C83610EBCA, 0x2E7D2C03A9507AE2, 0x3E23E8160039594A, 0x3F79BB7B435B0532, 0x420FCE314175DF40, 0x4CD9B7672D7FBEE8, 0x6ED5045938D710D0, 0x9A83C6CB1126D93D, 0xAAA9402664F1A41F, 0xCA978112CA1BBDCA, 0xCD0AA9856147B6C5, 0xDE7D1B721A1E0632);
  t_variable *variables = module->data.object.variables;
  t_ref *__d = &(variables[0]);
  t_ref *__f = &(variables[1]);
  t_ref *__c = &(variables[2]);
  t_ref *__b = &(variables[3]);
  t_ref *__e = &(variables[4]);
  t_ref *__i2 = &(variables[5]);
  t_ref *__i1 = &(variables[6]);
  t_ref *__i4 = &(variables[7]);
  t_ref *__i3 = &(variables[8]);
  t_ref *__h = &(variables[9]);
  t_ref *__a = &(variables[10]);
  t_ref *__g = &(variables[11]);
  t_ref *__i = &(variables[12]);
  // Logic
  __i1->value = i32_make(1);
  __i2->value = i32_make(2);
  __i3->value = i32_make(3);
  __i4->value = i32_make(4);
  __a->value = Addition(Addition(Addition(__i1->value, __i2->value), __i3->value), __i4->value);
  __b->value = Substraction(Substraction(Substraction(__i1->value, __i2->value), __i3->value), __i4->value);
  __c->value = Substraction(Multiplication(__i1->value, __i2->value), Multiplication(__i3->value, __i4->value));
  __d->value = Addition(Addition(__i2->value, function_call_0(function_call_0(object_read(__i1->value, 0x8254C329A92850F6)->value))), i32_make(3));
  __e->value = Substraction((Substraction(__i1->value, __i2->value)), (Substraction(__i3->value, __i4->value)));
  __f->value = Substraction(__i1->value, Multiplication(__i2->value, __i3->value));
  __g->value = Substraction(Multiplication(__i1->value, __i2->value), __i3->value);
  __h->value = Addition(Addition(__i1->value, Multiplication(__i2->value, __i3->value)), __i4->value);
  __i->value = Substraction(Substraction(__i1->value, Multiplication(__i2->value, __i3->value)), __i4->value);
  // After
  return module;
}

t_value *(*main_module)() = module_load
