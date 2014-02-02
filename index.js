/**
 * @file
 * A set of matrix operations
 *
 * @author Brice Chevalier
 *
 */

function pointRotationMatrixZYX(rotation) {
	var cosx = rotation.cosx;
	var cosy = rotation.cosy;
	var cosz = rotation.cosz;
	var sinx = rotation.sinx;
	var siny = rotation.siny;
	var sinz = rotation.sinz;

	return {
		a: cosz * cosy,
		b: sinz * cosy,
		c: -siny,
		d: cosz * siny * sinx - sinz * cosx,
		e: sinz * siny * sinx + cosz * cosx,
		f: cosy * sinx,
		g: cosz * siny * cosx + sinz * sinx,
		h: sinz * siny * cosx - cosz * sinx,
		i: cosy * cosx
	};
}

exports.pointRotationZYX = pointRotationMatrixZYX;

function pointRotationMatrixXYZ(rotation) {
	var cosx = rotation.cosx;
	var cosy = rotation.cosy;
	var cosz = rotation.cosz;
	var sinx = rotation.sinx;
	var siny = rotation.siny;
	var sinz = rotation.sinz;

	return {
		a: cosz * cosy,
		b: cosz * siny * sinx + sinz * cosx,
		c: sinz * sinx - cosz * siny * cosx,
		d: - sinz * cosy,
		e: cosz * cosx - sinz * siny * sinx,
		f: sinz * siny * cosx + cosz * sinx,
		g: siny,
		h: - cosy * sinx,
		i: cosy * cosx
	};
}

exports.pointRotationXYZ = pointRotationMatrixXYZ;

function axisRotationMatrix3D(axis, rotation) {
	var cos = rotation.cos;
	var sin = rotation.sin;

	var ax = axis.x;
	var ay = axis.y;
	var az = axis.z;

	var soc = (1 - cos);

	return {
		a: ax * ax * soc + cos,
		b: ax * ay * soc - az * sin,
		c: ax * az * soc + ay * sin,
		d: ay * ax * soc + az * sin,
		e: ay * ay * soc + cos,
		f: ay * az * soc - ax * sin,
		g: az * ax * soc - ay * sin,
		h: az * ay * soc + ax * sin,
		i: az * az * soc + cos
	};
}

exports.axisRotation3D = axisRotationMatrix3D;

function rotationXMatrix3D(rotation) {
	var cos = rotation.cos;
	var sin = rotation.sin;

	return {
		a: 1, b: 0,   c: 0,
		d: 0, e: cos, f: - sin,
		g: 0, h: sin, i: cos
	};
}

exports.rotationX3D = rotationXMatrix3D;

function rotationYMatrix3D(rotation) {
	var cos = rotation.cos;
	var sin = rotation.sin;

	return {
		a: cos,   b: 0, c: sin,
		d: 0,     e: 1, f: 0,
		g: - sin, h: 0, i: cos
	};
}

exports.rotationY3D = rotationYMatrix3D;

function rotationZMatrix3D(rotation) {
	var cos = rotation.cos;
	var sin = rotation.sin;

	return {
		a: cos, b: - sin, c: 0,
		d: sin, e: cos,   f: 0,
		g: 0,   h: 0,     i: 1
	};
}

exports.rotationZ3D = rotationZMatrix3D;

function matrixMultiplication3D(m1, m2) {
	return {
		a: m1.a * m2.a + m1.b * m2.d + m1.c * m2.g,
		b: m1.a * m2.b + m1.b * m2.e + m1.c * m2.h,
		c: m1.a * m2.c + m1.b * m2.f + m1.c * m2.i,
		d: m1.d * m2.a + m1.e * m2.d + m1.f * m2.g,
		e: m1.d * m2.b + m1.e * m2.e + m1.f * m2.h,
		f: m1.d * m2.c + m1.e * m2.f + m1.f * m2.i,
		g: m1.g * m2.a + m1.h * m2.d + m1.i * m2.g,
		h: m1.g * m2.b + m1.h * m2.e + m1.i * m2.h,
		i: m1.g * m2.c + m1.h * m2.f + m1.i * m2.i
	};
}

exports.multiplication3D = matrixMultiplication3D;

function matrixAddition3D(m1, m2) {
	return {
		a: m1.a + m2.a,
		b: m1.b + m2.b,
		c: m1.c + m2.c,
		d: m1.d + m2.d,
		e: m1.e + m2.e,
		f: m1.f + m2.f,
		g: m1.g + m2.g,
		h: m1.h + m2.h,
		i: m1.i + m2.i
	};
}

exports.addition3D = matrixAddition3D;

function matrixInverse3D(m) {
	var a = m.a;
	var b = m.b;
	var c = m.c;
	var d = m.d;
	var e = m.e;
	var f = m.f;
	var g = m.g;
	var h = m.h;
	var i = m.i;

	var c11 = e * i - h * f;
	var c21 = -(b * i - h * c);
	var c31 = b * f - e * c;
	var c12 = -(d * i - g * f);
	var c22 = a * i - g * c;
	var c32 = -(a * f - d * c);
	var c13 = d * h - g * e;
	var c23 = -(a * h - g * b);
	var c33 = a * e - d * b;

	var det = a * c11 + b * c12 + c * c13;

	return {
		a: c11 / det,
		b: c21 / det,
		c: c31 / det,
		d: c12 / det,
		e: c22 / det,
		f: c32 / det,
		g: c13 / det,
		h: c23 / det,
		i: c33 / det
	};
}

exports.inverse3D = matrixInverse3D;