# Security Policy

[简体中文](SECURITY.zh-CN.md) · [Project README](README.md)

## Scope

FIRE is a client-side WeChat Mini Program in the repository snapshot reviewed. The inspected page/calculation code does not implement a custom backend, network API calls, or persistent storage for scenario inputs. This does not eliminate risks from the WeChat platform, development configuration, device, or future code changes.

## Reporting a vulnerability

- **Do not** publish credentials, personal financial records, private AppIDs, exploit details, or sensitive screenshots in a public issue.
- If GitHub's private vulnerability reporting feature is enabled for this repository, use it to report security-sensitive findings.
- If private reporting is unavailable, contact the maintainer through the public GitHub profile to arrange a private reporting channel before sharing technical details.
- For non-sensitive bugs, use the public [issue tracker](https://github.com/LiSichao/fire/issues) and provide a minimal reproduction with synthetic data.

No response-time or remediation-time SLA is currently published. Please include affected files, the potential impact, steps to reproduce, and any practical mitigation—without including real user data.

## Maintainer guidance

- Do not commit secrets, signing credentials, private keys, or personal financial data.
- Review local/project-specific configuration before committing it.
- Keep bundled third-party components and their notices updated.
- Revisit this policy when release, dependency-management, or private-reporting processes are formalized.
