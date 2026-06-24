import { useState } from "react";
import { FiLock } from "react-icons/fi";
import {
  FiSunrise,
  FiSun,
  FiMoon,
  FiStar,
  FiZap,
  FiShield,
  FiTarget,
  FiAward,
  FiActivity,
  FiCrosshair,
  FiTrendingUp,
  FiHeart,
  FiFeather,
  FiBook,
  FiTool,
  FiLayers,
  FiSettings,
  FiTrash2,
} from "react-icons/fi";
import { checkBadges, checkGlobalBadges, getAllBadges } from "../utils/badges";

const BADGE_ICONS = {
  Sprout: FiActivity,
  Party: FiStar,
  Flame: FiZap,
  Award: FiAward,
  Zap: FiZap,
  Shield: FiShield,
  Star: FiStar,
  Target: FiTarget,
  Moon: FiMoon,
  Sun: FiSun,
  Activity: FiActivity,
  Crosshair: FiCrosshair,
  TrendingUp: FiTrendingUp,
  Trophy: FiAward,
  Diamond: FiAward,
  Heart: FiHeart,
  Feather: FiFeather,
  Book: FiBook,
  Tool: FiTool,
  Layers: FiLayers,
  Settings: FiSettings,
  Trash2: FiTrash2,
  Sunrise: FiSunrise,
};

export default function BadgeDisplay({ habits }) {
  const [collapsed, setCollapsed] = useState(true);

  const allEarned = new Set();
  habits
    .filter((h) => !h.archived)
    .forEach((h) => {
      checkBadges(h).forEach((b) => allEarned.add(b.id));
    });
  checkGlobalBadges(habits).forEach((b) => allEarned.add(b.id));

  const allBadges = getAllBadges();
  const earnedList = allBadges.filter((b) => allEarned.has(b.id));
  const lockedList = allBadges.filter((b) => !allEarned.has(b.id));

  return (
    <div className="badge-wrap">
      <button
        className="section-toggle"
        onClick={() => setCollapsed(!collapsed)}
      >
        <span>{collapsed ? "▶" : "▼"}</span> Badges ({earnedList.length}/
        {allBadges.length})
      </button>
      {!collapsed && (
        <div className="badge-grid">
          {earnedList.map((b) => {
            const BadgeIcon = BADGE_ICONS[b.icon] || FiStar;
            return (
              <div key={b.id} className="badge earned" title={b.desc}>
                <span className="badge-icon">
                  <BadgeIcon />
                </span>
                <span className="badge-label">{b.label}</span>
              </div>
            );
          })}
          {lockedList.map((b) => (
            <div key={b.id} className="badge locked" title={b.desc}>
              <span className="badge-icon">
                <FiLock />
              </span>
              <span className="badge-label">{b.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
