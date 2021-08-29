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

/**
 * Global utils
 */

void values_init();

t_value *value_factory(t_type *type);

t_value *value_factory_i32(t_i32 number);

#endif
