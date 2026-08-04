/** Single source of truth — Jogi Invisible Grills production port (multisite VPS). */
module.exports = {
  PORT: 3002,
  /**
   * ap-sites fleet uses HOSTNAME=localhost (IPv6 ::1). nginx must proxy_pass
   * http://localhost:PORT — not 127.0.0.1 — or you get 502 Bad Gateway.
   */
  HOSTNAME: "localhost",
  /** PM2 name when using repo-root ecosystem.config.cjs (/var/www layout). */
  PM2_NAME: "jogi-invisible-grills",
  /** PM2 name in /etc/ap-sites/ecosystem.multisite.config.cjs. */
  AP_SITES_PM2_NAME: "jogiinvisiblegrills",
};
