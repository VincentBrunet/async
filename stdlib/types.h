#include <stdlib.h>
#include <stdint.h>

#ifndef __TYPES_H
#define __TYPES_H

/**
 * Typedefs primitive types
 */

typedef uint8_t t_u8;
typedef uint16_t t_u16;
typedef uint32_t t_u32;
typedef uint64_t t_u64;

typedef int8_t t_i8;
typedef int16_t t_i16;
typedef int32_t t_i32;
typedef int64_t t_i64;

typedef float t_f32;
typedef double t_f64;

typedef uint8_t t_boolean;

/**
 * Typedefs internal types, forward declaration
 */

typedef struct t_scope t_scope;

typedef struct t_object t_object;
typedef struct t_function t_function;
typedef struct t_string t_string;

typedef union t_content t_content;
typedef struct t_type t_type;

typedef struct t_value t_value;
typedef struct t_variable t_variable;

/**
 * Typedefs internal types, actual declaration
 */

typedef struct t_scope {
  t_variable *variables;
  t_u32 size;
} t_scope;

typedef struct t_object {
  t_scope fields;
} t_object;

typedef struct t_function {
  t_scope closure;
  void* callable;
} t_function;

typedef struct t_string {
  t_u32 hash;
  t_u32 size;
  t_i8 *chars;
} t_string;

typedef union t_content {
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
  t_object object;
  t_function function;
  t_string string;
  t_boolean boolean;
} t_content;

typedef struct t_type {
  t_u32 parent_count;
  t_type **parent_array;
} t_type;

typedef struct t_value {
  t_content content;
  t_type *type;
} t_value;

typedef struct t_variable {
  t_value *value;
} t_variable;

/**
 * Global native types
 */

extern t_type *type_value;

extern t_type *type_u8;
extern t_type *type_u16;
extern t_type *type_u32;
extern t_type *type_u64;

extern t_type *type_i8;
extern t_type *type_i16;
extern t_type *type_i32;
extern t_type *type_i64;

extern t_type *type_f32;
extern t_type *type_f64;

extern t_type *type_object;
extern t_type *type_function;
extern t_type *type_string;
extern t_type *type_boolean;

/**
 * Utils
 */

void type_init();

t_type *type_factory(t_u32 parents);
t_type *type_factory_value(t_u32 parents);

#endif
