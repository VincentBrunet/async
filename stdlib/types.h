#ifndef __TYPES_H
#define __TYPES_H

/**
 * Typedefs primitive types
 */

typedef unsigned char t_u8;
typedef unsigned short t_u16;
typedef unsigned long t_u32;
typedef unsigned long long t_u64;

typedef char t_i8;
typedef short t_i16;
typedef long t_i32;
typedef long long t_i64;

typedef float t_f32;
typedef double t_f64;
typedef long double t_f128;

typedef void* t_function;

/**
 * Typedefs internal types, forward declaration
 */

typedef struct t_object t_object;
typedef struct t_string t_string;

typedef union t_data t_data;
typedef struct t_type t_type;

typedef struct t_value t_value;
typedef struct t_variable t_variable;

/**
 * Typedefs internal types, actual declaration
 */

typedef struct t_object {
  t_u32 fields_count;
  t_variable *fields_array;
} t_object;

typedef struct t_string {
  t_u32 hash;
  t_u32 size;
  t_i8 *chars;
} t_string;

typedef union t_data {
  t_object object;
  t_function function;
  t_string string;
  t_u8 u8;
  t_u16 u16;
  t_u32 u32;
  t_u64 u64;
  t_i8 i8;
  t_i16 i16;
  t_i32 i32;
  t_i64 i64;
  t_f32 f32;
  t_f64 f64;
  t_f128 f128;
} t_data;

typedef struct t_type {
  t_u32 parent_count;
  t_type **parent_array;
} t_type;

typedef struct t_value {
  t_data data;
  t_type *type;
} t_value;

typedef struct t_variable {
  t_value *value;
} t_variable;

/**
 * Global native types
 */

extern t_type *type_i32;
extern t_type *type_i64;
extern t_type *type_string;

/**
 * Utils
 */
t_type *type_factory(t_u32 parents);

#endif
