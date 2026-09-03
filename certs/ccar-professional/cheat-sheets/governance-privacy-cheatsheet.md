# ⚡ Cheat Sheet: Enterprise Governance & ZDR

## 1. Zero Data Retention (ZDR) Contract
* Commercial API requests are NOT used to train Anthropic foundation models.
* ZDR contracts eliminate temporary gateway logging for high-compliance environments.

## 2. Prompt Injection Defense-in-Depth
1. **Sanitization / Pre-filtering**: Regex + Haiku classifier for adversarial tokens.
2. **Structural Demarcation**: Strict XML encapsulation (`<external_source>`).
3. **Model Instruction Hierarchy**: System instructions explicitly override user document instructions.
4. **Tool Isolation**: Tools only have SELECT permissions; mutations require signed Human-in-the-Loop tokens.
