#ifndef __CORE_H
#define __CORE_H

#include <stdlib.h>
#include <stdint.h>
#include <stdarg.h>

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

#define FALSE 0
#define TRUE 1
typedef uint8_t t_boolean;

/**
 * Typedefs internal types, forward declaration
 */

typedef struct t_ref t_ref;
typedef struct t_variable t_variable;

typedef struct t_object t_object;

typedef struct t_function t_function;
typedef struct t_string t_string;

typedef union t_data t_data;
typedef struct t_type t_type;

typedef struct t_value t_value;

/**
 * Typedefs internal types, actual declaration
 */

// Value holder
typedef struct t_ref
{
  t_value *value;
} t_ref;

// Named value holder
typedef struct t_variable
{
  t_ref ref;
  t_u64 key;
} t_variable;

// Set of variable (compacted in memory)
typedef struct t_object
{
  t_u32 size;
  t_variable *variables;
} t_object;

// Runnable value with closure
typedef struct t_function
{
  t_ref **closure;
  void *callable;
} t_function;

// Immutable string
typedef struct t_string
{
  t_u32 hash;
  t_u32 size;
  t_i8 *chars;
} t_string;

// Union of all possible value content
typedef union t_data
{
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
  //t_string string;
  t_boolean boolean;
} t_data;

// Representation of a value type
typedef struct t_type
{
  t_u32 parent_count;
  t_type **parent_array;
} t_type;

// Immutable value
typedef struct t_value
{
  t_data data;
  t_type *type;
} t_value;

#endif
