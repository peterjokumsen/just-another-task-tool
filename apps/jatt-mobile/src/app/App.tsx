/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  useColorScheme,
  Dimensions,
} from 'react-native';
import Svg, { Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import {
  LIGHT_THEME,
  DARK_THEME,
  BASE_TOKENS,
} from '@just-another-task-tool/shared-styles';

const { width } = Dimensions.get('window');

type Screen = 'landing' | 'login' | 'signup';

const FEATURES = [
  {
    title: 'AI-Powered Tagging',
    description: 'Automatically categorize your tasks using advanced AI language models.',
    icon: '🧠',
  },
  {
    title: 'Smart Breakdowns',
    description: 'Turn complex projects into manageable checklists with a single click.',
    icon: '⚡',
  },
  {
    title: 'Seamless Sync',
    description: 'Switch between web and mobile effortlessly with real-time synchronization.',
    icon: '🔄',
  },
];

export const App = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DARK_THEME : LIGHT_THEME;
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');

  const renderHeader = () => (
    <View style={styles.nav}>
      <TouchableOpacity onPress={() => setCurrentScreen('landing')}>
        <Text style={styles.logoText}>JATT</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.loginBtn}
        onPress={() => setCurrentScreen('login')}
      >
        <Text style={[styles.loginText, { color: theme.colors.textSecondary }]}>Login</Text>
      </TouchableOpacity>
    </View>
  );

  const renderLanding = () => (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.hero}>
        <Text 
          testID="heading"
          style={[styles.heroTitle, { color: theme.colors.textPrimary }]}
        >
          Master Your Productivity.{'\n'}
          <Text style={{ color: theme.colors.primary }}>Seamlessly.</Text>
        </Text>
        <Text style={[styles.heroSubtitle, { color: theme.colors.textSecondary }]}>
          Effortless task management with JATT. Organize, collaborate, and achieve more every day with our AI-powered tool.
        </Text>
        <TouchableOpacity 
          style={styles.btnPrimary}
          onPress={() => setCurrentScreen('signup')}
        >
          <Text style={styles.btnPrimaryText}>Get Started</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.featuresSection}>
        {FEATURES.map((feature, idx) => (
          <View key={idx} style={[styles.featureCard, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <Text style={styles.featureIcon}>{feature.icon}</Text>
            <Text style={[styles.featureTitle, { color: theme.colors.textPrimary }]}>{feature.title}</Text>
            <Text style={[styles.featureDescription, { color: theme.colors.textSecondary }]}>{feature.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
          © 2026 JATT - Just Another Task Tool.{'\n'}All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );

  const renderPlaceholder = (type: 'login' | 'signup') => (
    <View style={styles.placeholderContainer}>
      <Text style={[styles.placeholderTitle, { color: theme.colors.textPrimary }]}>
        {type === 'login' ? 'Welcome Back' : 'Join JATT'}
      </Text>
      <Text style={[styles.placeholderSubtitle, { color: theme.colors.textSecondary }]}>
        This is a placeholder for the {type} screen. Authenticate seamlessly on all your devices.
      </Text>
      <TouchableOpacity 
        style={styles.btnSecondary}
        onPress={() => setCurrentScreen('landing')}
      >
        <Text style={[styles.btnSecondaryText, { color: theme.colors.textPrimary }]}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      {renderHeader()}
      {currentScreen === 'landing' && renderLanding()}
      {currentScreen === 'login' && renderPlaceholder('login')}
      {currentScreen === 'signup' && renderPlaceholder('signup')}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -1,
    color: '#a855f7', // Static primary for logo brand consistency
  },
  loginBtn: {
    padding: 8,
  },
  loginText: {
    fontSize: 16,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  hero: {
    paddingVertical: 48,
    alignItems: 'flex-start',
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: '800',
    lineHeight: 48,
    letterSpacing: -1.5,
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 32,
    maxWidth: '90%',
  },
  btnPrimary: {
    backgroundColor: '#a855f7',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    shadowColor: '#a855f7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  btnPrimaryText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  featuresSection: {
    marginTop: 24,
  },
  featureCard: {
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
  footer: {
    marginTop: 48,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  placeholderTitle: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 16,
    textAlign: 'center',
  },
  placeholderSubtitle: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: 32,
  },
  btnSecondary: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.1)',
  },
  btnSecondaryText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default App;
