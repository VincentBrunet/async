#ifndef __object_HPP
#define __object_HPP

#include "core.hpp"

namespace ac {

struct object_type {
};

struct object_data {
};

struct object_mem {
  object_type *type;
  object_data *data;
};

// using object = std::shared_ptr<object_mem>;

}  // namespace ac

#endif
