#include <runtime.h>

t_value *o_0x0(t_ref **closure) {
  // Variables
  t_value *object = object_make_x(type_object, 2, 0x3E23E8160039594A, 0xCA978112CA1BBDCA);
  t_field *fields = object->data.object.fields;
  t_ref *__b = (t_ref *)&(fields[0]);
  t_ref *__a = (t_ref *)&(fields[1]);
  // Logic
  __a->value = i32_substraction(i32_addition(closure[0]->value, i32_make(10)), closure[1]->value);
  __b->value = i32_addition(i32_negative(closure[1]->value), i32_make(10));
  // After
  return object;
}

t_value *f_0x0(t_ref **closure, t_value *__a, t_value *__b) {
  // Logic
  { 
    printf("Hello, A:%d\n", __a->data.i32);
    printf("Hello, B:%d\n", __b->data.i32);
   };
  return object_call_x(&o_0x0, 2, ref_make(__a), ref_make(__b));
  // After
  return null_make();
}

t_value *o_0x1(t_ref **closure) {
  // Variables
  t_value *object = object_make_x(type_object, 1, 0xEB759C75BAE1C8B6);
  t_field *fields = object->data.object.fields;
  t_ref *__my_print = (t_ref *)&(fields[0]);
  // Logic
  __my_print->value = closure[0]->value;
  // After
  return object;
}

t_value *module_load() {
  // Variables
  t_ref *__my_print = ref_make(NULL);
  // Logic
  __my_print->value = function_make_x(type_function, &f_0x0, 0);
  return object_call_x(&o_0x1, 1, __my_print);
}

t_value *(*entry_module)() = module_load;
