#ifndef __OBJECTS_H
#define __OBJECTS_H

#include "types.h"

/**
 * Global utils
 */

t_object *object_alloc();

void object_init(t_object *object, t_u32 size);

void object_key(t_object *object, t_u32 idx, t_u32 key);

t_variable *object_get(t_object *object, t_u32 key);

#endif
