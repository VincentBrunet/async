#ifndef __CLOSURES_H
#define __CLOSURES_H

#include "types.h"

/**
 * Global utils
 */

void closures_init();

void closure_init(t_closure *closure, t_u32 size);

void closure_key(t_closure *closure, t_u32 idx, t_u32 key);

t_variable *closure_get(t_closure *closure, t_u32 key);

#endif
