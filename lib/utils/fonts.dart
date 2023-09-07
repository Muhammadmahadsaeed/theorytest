import 'package:flutter/material.dart';

class AppFonts {
  static String _fontName = 'Montserrat';

  static TextStyle regular({double fontSize = 16, Color color = Colors.black}) {
    return TextStyle(
        fontFamily: _fontName,
        fontSize: fontSize,
        fontWeight: FontWeight.normal,
        color: color);
  }

  static TextStyle bold({double fontSize = 16.0, Color color = Colors.black}) {
    return TextStyle(
        fontFamily: _fontName,
        fontSize: fontSize,
        fontWeight: FontWeight.bold,
        color: color);
  }
}
