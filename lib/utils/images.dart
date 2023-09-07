import 'package:flutter/widgets.dart';
import 'package:flutter_svg/flutter_svg.dart';

class AppImages {
  static const String _basePath = 'assets/images';

  static splash({double? width, double? height}) {
    return const DecorationImage(
        image: AssetImage('$_basePath/splash.png'), fit: BoxFit.cover);
  }

  static Widget care01({double? width, double? height}) {
    return SvgPicture.asset(
      '$_basePath/care01.svg',
      height: height,
      width: width,
    );
  }

  static Widget care02({double? width, double? height}) {
    return SvgPicture.asset(
      '$_basePath/care02.svg',
      height: height,
      width: width,
    );
  }

  static Widget care03({double? width, double? height}) {
    return SvgPicture.asset(
      '$_basePath/care03.svg',
      height: height,
      width: width,
    );
  }

  static Widget care04({double? width, double? height}) {
    return SvgPicture.asset(
      '$_basePath/care04.svg',
      height: height,
      width: width,
    );
  }
}
