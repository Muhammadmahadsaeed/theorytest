import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:theorytest/screens/app-intro/content.dart';
import 'package:theorytest/utils/images.dart';

class AppIntroView extends StatefulWidget {
  const AppIntroView({super.key});

  @override
  State<AppIntroView> createState() => _AppIntroViewState();
}

class _AppIntroViewState extends State<AppIntroView> {
  static const String _basePath = 'assets/images';

  List slider = [
    {
      "id": 1,
      "image": '$_basePath/care02.svg',
      "title": 'Trained Caregivers',
      "description":
          'Connecting you with expert caregivers, tailored to your needs.'
    },
    {
      "id": 1,
      "image": '$_basePath/care03.svg',
      "title": 'Discover Seamless Care',
      "description":
          'Reliable, high-quality care services  because you deserve the best.'
    },
    {
      "id": 1,
      "image": '$_basePath/care03.svg',
      "title": 'Experience the Difference',
      "description":
          'Manage bookings, make payments, and communicate – all from one place.'
    },
    {
      "id": 1,
      "image": '$_basePath/care04.svg',
      "title": 'Let Us Serve You Better',
      "description":
          "To connect you with the best local caregivers, '800 Caregiver' needs your location."
    }
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: SafeArea(
      child: Column(children: [
        Expanded(
            child: PageView.builder(
                itemCount: slider.length,
                scrollDirection: Axis.horizontal,
                itemBuilder: (context, index) => Padding(
                      padding: const EdgeInsets.all(8),
                      child: Column(
                        children: [
                          SvgPicture.asset(
                            slider[index]["image"],
                            height: 200,
                          ),
                          Text(
                            contents[index].title,
                            style: TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          SizedBox(height: 20),
                          Text(
                            contents[index].discription,
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              fontSize: 14,
                              color: Colors.grey,
                            ),
                          )
                        ],
                      ),
                    ))),
        SizedBox(
          height: 20,
          // width: 100,
          child: Container(
            color: Colors.pink,
            child: Text("pagiantion"),
          ),
        ),
        SizedBox(
          height: 200,
          // width: 100,
          child: Container(
            color: Colors.pink,
          ),
        )
      ]),
    ));
  }
}
