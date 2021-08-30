#ifndef __OBJECTS_H
#define __OBJECTS_H

#include "types.h"

/**
 * Global utils
 */

void objects_init();

t_object *object_factory(t_u32 size);

void object_init(t_object *object, t_u32 size);

void object_key(t_object *object, t_u32 idx, t_u32 key);

void object_set(t_object *object, t_u32 key, t_value *value);

t_value *object_get(t_object *object, t_u32 key);

void object_sort(t_object *object);

t_i32 object_variable_compare(const void *a, const void *b);

#endif
