import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const source = readFileSync(new URL("../app.js", import.meta.url), "utf8");
const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const style = readFileSync(new URL("../style.css", import.meta.url), "utf8");
const stripeCount = (html.match(/class="wipe-stripe"/g) || []).length;

function readFunction(name) {
  const start = source.indexOf(`function ${name}(`);
  assert.notEqual(start, -1, `${name} must exist`);
  const next = source.indexOf("\n  function ", start + 1);
  return source.slice(start, next === -1 ? source.length : next);
}

test("shopping mall outing opens an entrance scene with facility guide", () => {
  assert.match(source, /const FREE_MODE_OUTING_VENUES =/);
  assert.match(source, /id: "shopping_mall"/);
  assert.match(source, /Shopping_Mall_Entrance\.png/);
  assert.match(source, /Game_Center\.png/);
  assert.match(source, /Karaoke\.png/);
  assert.match(source, /AnimeShop\.png/);
  assert.match(source, /Cinema\.png/);
  assert.match(source, /cinema/);

  assert.match(html, /id="freeModeOutingSceneOverlay"/);
  assert.match(html, /id="freeModeOutingSceneImage"/);
  assert.match(html, /id="freeModeOutingFacilityGuideBtn"/);
  assert.match(html, /id="freeModeOutingFacilityGuide"/);
  assert.match(html, /id="freeModeOutingSceneIdols"/);
  assert.match(html, /id="freeModeOutingIdolActionMenu"/);

  assert.match(readFunction("confirmFreeModeOutingDestination"), /getFreeModeOutingVenueByDestination/);
  assert.match(readFunction("confirmFreeModeOutingDestination"), /openFreeModeOutingScene/);
  assert.match(readFunction("renderFreeModeOutingSceneIdols"), /resolveIdolStandeeSrc/);
  assert.match(source, /freeModeOutingSceneBackBtn[\s\S]*openFreeModeOutingOverlay/);
  assert.match(source, /freeModeOutingFacilityGuideBtn[\s\S]*openFreeModeOutingFacilityGuide/);
  assert.match(source, /freeModeOutingFacilityGuideCloseBtn[\s\S]*closeFreeModeOutingFacilityGuide/);
  assert.match(source, /data-outing-idol-action[\s\S]*handleFreeModeOutingIdolAction/);
  assert.match(readFunction("renderFreeModeOutingFacilityGuide"), /data-outing-facility-id/);
});


test("shopping mall outing scene uses the fullscreen page and shared wipe transition", () => {
  assert.equal(stripeCount, 6);
  assert.match(style, /\.wipe-stripe\s*\{[\s\S]*height:\s*calc\(100vh \/ 6 \+ 2px\)/);
  assert.match(style, /\.wipe-stripe\s*\{[\s\S]*top:\s*calc\(var\(--i\) \* \(100vh \/ 6\)\)/);
  assert.match(style, /\.free-mode-outing-scene-overlay\s*\{[\s\S]*place-items:\s*stretch/);
  assert.match(style, /\.free-mode-outing-scene-panel\s*\{[\s\S]*width:\s*100vw/);
  assert.match(style, /\.free-mode-outing-scene-panel\s*\{[\s\S]*height:\s*100svh/);
  assert.match(readFunction("openFreeModeOutingScene"), /triggerWipeTransition/);
  assert.doesNotMatch(style, /mallSceneEnter|mallSceneImageSettle/);
});
test("outing scene prompt includes current venue and facility context", () => {
  assert.match(readFunction("buildFreeModeOutingExplorePrompt"), /getActiveFreeModeOutingFacility/);
  assert.match(readFunction("buildFreeModeOutingExplorePrompt"), /当前设施/);
  assert.match(readFunction("buildFreeModeOutingExplorePrompt"), /当前场景/);
  assert.match(readFunction("startFreeModeOutingFacilityExplore"), /beginMapLocationExploreSession/);
});
