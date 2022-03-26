
//#include "runtime.h"

typedef struct t_field t_field;
typedef struct t_field
{
  t_u64 key;
  t_any value;
}

typedef struct t_object t_object;
struct t_object
{
  int size;
  t_field fields;
};

typedef struct t_union8 t_union8;
typedef union t_union8_data t_union8_data
{
  t_i8 i8;
  t_u8 u8;
}
struct t_union8
{
  t_i8 type;
  t_union8_data data;
}

typedef struct t_function_FFF_closure t_function_FFF_closure;
struct t_function_FFF_closure
{
  t_union8 uuu;
  t_i32 *dudu1;
  t_
}

typedef struct t_module_HELLO t_module_HELLO;
struct t_module_HELLO
{
  t_object lala; // export const lala: MyObject;
  t_union8 uuu; // export const uuu: i8 | null = null;
  t_i32 *dudu1; // export mutable dudu: i32 = 32;
  t_function fff; // export const fff: ()=>null;
};

t_module_HELLO *module_HELLO()
{
  static t_module_HELLO *module = 0;
  if (module != 0) {
    return module;
  }
  module = malloc(sizeof(t_module_HELLO));
  {

    // export const uuu: i8 | null = 1
    // export mutable dudu1: i32 = 32
    // mutable dudu2: i32 | null = 22;
    // mutable dudu3: i32 = 11;
    // export const fff = fn (v:i32) {
    //    dudu1 = v + uuu
    //    dudu2 = v + uuu
    // }
    // fff(99)

    // CONTENT MODULE - START
    t_union8 uuu;
    t_i32 *dudu1 = i32_alloc();
    t_i32 *dudu2 = i32_alloc();
    t_union32 dudu3 = union32_alloc();


    t_union8 uuu = union8_make(0, 1);
    t_i32 *dudu = 32;
    t_i32 *dudu2 = 22;
    *dudu3 = union8_make(11);
    // CONTENT MODULE - END
  }
  return module;
}

int main()
{

  t_module module_HELLO()

}