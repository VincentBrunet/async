#ifndef __VALUES_H
#define __VALUES_H

#include "types.h"

/**
 * Global native values
 */

extern t_value *value_false;
extern t_value *value_true;

extern t_value *value_null;

extern t_value *value_empty_string;
extern t_value *value_empty_object;
extern t_value *value_empty_function;

/**
 * Global utils
 */

void values_init();

t_value *value_factory_i32(t_i32 number);

t_value *value_factory_object(t_type *type, t_u32 size, ...);

t_value *value_factory_function(t_type *type, void* callable, t_u32 size, ...);

t_value *value_factory_boolean(t_boolean value);

t_value *value_factory_string(t_u32 hash, t_u32 size, t_i8 *chars);

#endif
