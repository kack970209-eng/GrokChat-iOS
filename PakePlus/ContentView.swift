//
//  ContentView.swift
//  PakePlus
//
//  Created by Song on 2025/3/29.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        ZStack {
            Color.white
                .ignoresSafeArea()
            
            if let indexPath = Bundle.main.path(forResource: "index", ofType: "html", inDirectory: "local_app") {
                WebView(url: URL(fileURLWithPath: indexPath))
            } else {
                WebView(url: URL(string: "https://grok.x.ai/")!)
            }
        }
    }
}

#Preview {
    ContentView()
}