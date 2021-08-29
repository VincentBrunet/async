#ifndef __SCOPES_H
#define __SCOPES_H

#include "types.h"

/**
 * Global utils
 */

void scopes_init();

t_scope *scope_factory(t_u32 size);

void scope_sort(t_scope *scope);

//t_boolean scope_is(t_scope *scope, t_scope *other);

#endif
