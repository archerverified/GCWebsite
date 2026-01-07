/**
 * Lighthouse runner script
 * Runs SEO audits for all configured routes in both desktop and mobile modes
 */

import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { routes, getFullUrl } from './routes.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPORTS_DIR = path.join(process.cwd(), 'reports', 'lighthouse');

// Lighthouse configuration for different devices
const CONFIGS = {
  mobile: {
    extends: 'lighthouse:default',
    settings: {
      formFactor: 'mobile',
      throttling: {
        rttMs: 150,
        throughputKbps: 1638.4,
        cpuSlowdownMultiplier: 4
      },
      screenEmulation: {
        mobile: true,
        width: 375,
        height: 812,
        deviceScaleFactor: 3
      },
      emulatedUserAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1'
    }
  },
  desktop: {
    extends: 'lighthouse:default',
    settings: {
      formFactor: 'desktop',
      throttling: {
        rttMs: 40,
        throughputKbps: 10240,
        cpuSlowdownMultiplier: 1
      },
      screenEmulation: {
        mobile: false,
        width: 1440,
        height: 900,
        deviceScaleFactor: 1
      },
      emulatedUserAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
  }
};

/**
 * Clear and recreate reports directory
 */
async function clearReportsDir() {
  console.log('🧹 Clearing reports directory...');
  try {
    await fs.rm(REPORTS_DIR, { recursive: true, force: true });
  } catch (error) {
    // Directory might not exist yet
  }
  await fs.mkdir(REPORTS_DIR, { recursive: true });
}

/**
 * Run Lighthouse audit for a single URL
 */
async function runAudit(url, device, chrome, port) {
  const config = CONFIGS[device];
  const options = {
    logLevel: 'info',
    output: ['html', 'json'],
    port: port
  };

  console.log(`  📊 Running ${device} audit...`);
  const runnerResult = await lighthouse(url, options, config);
  
  return {
    html: runnerResult.report[0],
    json: runnerResult.report[1],
    scores: {
      performance: runnerResult.lhr.categories.performance.score * 100,
      seo: runnerResult.lhr.categories.seo.score * 100,
      accessibility: runnerResult.lhr.categories.accessibility.score * 100,
      bestPractices: runnerResult.lhr.categories['best-practices'].score * 100
    }
  };
}

/**
 * Save audit reports to disk
 */
async function saveReports(routeName, device, reports) {
  const routeDir = path.join(REPORTS_DIR, routeName);
  await fs.mkdir(routeDir, { recursive: true });
  
  const htmlPath = path.join(routeDir, `${device}.html`);
  const jsonPath = path.join(routeDir, `${device}.json`);
  
  await fs.writeFile(htmlPath, reports.html);
  await fs.writeFile(jsonPath, reports.json);
  
  return { htmlPath, jsonPath, scores: reports.scores };
}

/**
 * Main function to run all audits
 */
async function runAllAudits() {
  console.log('🚀 Starting SEO Audit with Lighthouse\n');
  console.log('================================\n');
  
  // Clear reports directory
  await clearReportsDir();
  
  // Launch Chrome
  console.log('🌐 Launching Chrome...\n');
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless'],
    logLevel: 'error'
  });
  
  const summaryTable = [];
  
  try {
    // Run audits for each route
    for (const route of routes) {
      const url = getFullUrl(route.path);
      console.log(`\n📍 Auditing: ${route.name}`);
      console.log(`   URL: ${url}`);
      
      const routeScores = {
        route: route.name,
        path: route.path
      };
      
      // Run mobile audit
      try {
        const mobileResult = await runAudit(url, 'mobile', chrome, chrome.port);
        const mobileReport = await saveReports(route.name, 'mobile', mobileResult);
        routeScores.mobile = mobileResult.scores;
        console.log(`  ✅ Mobile audit complete`);
      } catch (error) {
        console.error(`  ❌ Mobile audit failed: ${error.message}`);
        routeScores.mobile = null;
      }
      
      // Run desktop audit
      try {
        const desktopResult = await runAudit(url, 'desktop', chrome, chrome.port);
        const desktopReport = await saveReports(route.name, 'desktop', desktopResult);
        routeScores.desktop = desktopResult.scores;
        console.log(`  ✅ Desktop audit complete`);
      } catch (error) {
        console.error(`  ❌ Desktop audit failed: ${error.message}`);
        routeScores.desktop = null;
      }
      
      summaryTable.push(routeScores);
    }
    
    // Print summary
    console.log('\n\n================================');
    console.log('📊 AUDIT SUMMARY\n');
    
    for (const row of summaryTable) {
      console.log(`\n📄 ${row.route} (${row.path})`);
      if (row.mobile) {
        console.log(`  Mobile:  Perf ${Math.round(row.mobile.performance)}% | SEO ${Math.round(row.mobile.seo)}% | A11y ${Math.round(row.mobile.accessibility)}% | BP ${Math.round(row.mobile.bestPractices)}%`);
      }
      if (row.desktop) {
        console.log(`  Desktop: Perf ${Math.round(row.desktop.performance)}% | SEO ${Math.round(row.desktop.seo)}% | A11y ${Math.round(row.desktop.accessibility)}% | BP ${Math.round(row.desktop.bestPractices)}%`);
      }
    }
    
    // Save summary to JSON
    const summaryPath = path.join(REPORTS_DIR, 'summary.json');
    await fs.writeFile(summaryPath, JSON.stringify(summaryTable, null, 2));
    
    console.log('\n\n✨ Audit complete! Reports saved to:', REPORTS_DIR);
    
  } finally {
    // Clean up Chrome instance
    console.log('\n🧹 Cleaning up...');
    await chrome.kill();
  }
}

// Run the audit
runAllAudits().catch(error => {
  console.error('❌ Audit failed:', error);
  process.exit(1);
});
