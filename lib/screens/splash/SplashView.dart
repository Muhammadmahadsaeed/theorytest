import 'dart:async';

import 'package:flutter/material.dart';
import 'package:theorytest/screens/app-intro/AppIntroView.dart';
import 'package:theorytest/utils/fonts.dart';
import 'package:theorytest/utils/images.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    Timer(
        const Duration(seconds: 2),
        () => Navigator.pushReplacement(context,
            MaterialPageRoute(builder: (context) => const AppIntroView())));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
          child: Container(
        height: double.infinity,
        width: double.infinity,
        decoration: BoxDecoration(image: AppImages.splash()),
      )),
    );
  }
}
