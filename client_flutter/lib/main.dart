import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'TrustShop Demo',
      home: const HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int trustScore = 0;
  final productIdController = TextEditingController(text: 'product-1');
  Future<void> fetchScore() async {
    final id = productIdController.text;
    final url = Uri.parse('http://10.0.2.2:3000/products/$id/trustscore'); // 模拟地址
    final resp = await http.get(url);
    if (resp.statusCode == 200) {
      final obj = jsonDecode(resp.body);
      setState(() {
        trustScore = obj['trustScore'] ?? 0;
      });
    } else {
      setState(() {
        trustScore = -1;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: const Text('TrustShop Demo')),
        body: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(children: [
              TextField(controller: productIdController),
              ElevatedButton(onPressed: fetchScore, child: const Text('获取可信度')),
              Text('可信度分数: $trustScore')
            ])));
  }
}
