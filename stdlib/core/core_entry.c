#include <core/core_entry.h>
#include <stdio.h>

/**
 * Entrypoint
 */
int main() {
  types_init();

  /*
  printf(" -- interfaces -- \n");
  printf("type_i32: %p\n", (void *)type_i32);
  printf("type_i64: %p\n", (void *)type_i64);
  printf("type_string: %p\n", (void *)type_string);

  printf(" -- unsigned integers -- \n");
  printf("sizeof(t_u8): %ld\n", sizeof(t_u8));
  printf("sizeof(t_u16): %ld\n", sizeof(t_u16));
  printf("sizeof(t_u32): %ld\n", sizeof(t_u32));
  printf("sizeof(t_u64): %ld\n", sizeof(t_u64));

  printf(" -- signed integers -- \n");
  printf("sizeof(t_i8): %ld\n", sizeof(t_i8));
  printf("sizeof(t_i16): %ld\n", sizeof(t_i16));
  printf("sizeof(t_i32): %ld\n", sizeof(t_i32));
  printf("sizeof(t_i64): %ld\n", sizeof(t_i64));

  printf(" -- floating points -- \n");
  printf("sizeof(t_f32): %ld\n", sizeof(t_f32));
  printf("sizeof(t_f64): %ld\n", sizeof(t_f64));

  printf(" -- content types -- \n");
  printf("sizeof(t_object): %ld\n", sizeof(t_object));
  printf("sizeof(t_function): %ld\n", sizeof(t_function));
  printf("sizeof(t_string): %ld\n", sizeof(t_string));
  printf("sizeof(t_boolean): %ld\n", sizeof(t_boolean));

  printf(" -- value type -- \n");
  printf("sizeof(t_type): %ld\n", sizeof(t_type));
  printf("sizeof(t_data): %ld\n", sizeof(t_data));
  printf("sizeof(t_value): %ld\n", sizeof(t_value));

  printf(" -- runtime type -- \n");
  printf("sizeof(t_ref): %ld\n", sizeof(t_ref));
  printf("sizeof(t_field): %ld\n", sizeof(t_field));

  printf(" -- type hierachy -- \n");
  printf("type_is(type_object, type_root): %hhu\n", type_is(type_object, type_root));
  printf("type_is(type_boolean, type_root): %hhu\n", type_is(type_boolean, type_root));
  printf("type_is(type_null, type_root): %hhu\n", type_is(type_null, type_root));
  printf("type_is(type_string, type_root): %hhu\n", type_is(type_string, type_root));
  printf("type_is(type_null, type_string): %hhu\n", type_is(type_null, type_string));
  //*/

  if (entry_module != NULL) {
    //printf(" -- main module -- \n");
    entry_module();
    //printf(" -- end module -- \n");
  }
}
