#ifndef __tmp_types_H
#define __tmp_types_H

#include <core/core_struct.h>

/**
 * Global native types
 */

extern t_type *type_root;

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
extern t_type *type_null;

/**
 * Global util
 */

void types_init();

t_type *type_factory(t_u32 parents);

void type_sort(t_type *type);

t_boolean type_is(t_type *type, t_type *other);

#endif
