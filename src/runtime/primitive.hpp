#ifndef __primitive_HPP
#define __primitive_HPP

#include "core.hpp"

namespace ac {

struct unknown {};

struct nothing {};

typedef uint8_t boolean;

typedef uint8_t u8;
typedef uint16_t u16;
typedef uint32_t u32;
typedef uint64_t u64;

typedef int8_t i8;
typedef int16_t i16;
typedef int32_t i32;
typedef int64_t i64;

typedef float f32;
typedef double f64;

typedef uintptr_t pointer;

nothing nothing_make();
unknown unknown_make();

}  // namespace ac

#endif
