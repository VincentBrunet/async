#ifndef __core_HPP
#define __core_HPP

#include <cinttypes>
#include <functional>
#include <memory>
#include <string>

namespace ac {

template <typename T>
using ref = std::shared_ptr<T>;

}  // namespace ac

#endif
