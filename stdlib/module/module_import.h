#ifndef __module_import_H
#define __module_import_H

#include <core/core_struct.h>

t_ref *module_import(t_ref **(*loader)(), t_u32 idx);

#endif
