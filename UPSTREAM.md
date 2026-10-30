# Upstream tracking

Dynamic Drag & Drop Dashboard is derived from two MIT-licensed projects by
Prosono. Upstream changes are reviewed and cherry-picked deliberately; they are
not merged automatically because this distribution removes HADS and changes the
packaging model.

| Component | Repository | Last imported commit |
| --- | --- | --- |
| Frontend | https://github.com/Prosono/Drag-And-Drop-Card | `66b19a043b6ee13d0a0f312adc3e061c52bb6339` (v2.2.3) |
| Backend | https://github.com/Prosono/Drag-And-Drop-Card-Backend | `254639dc6738612f2a9a19009ea683710413cc07` |

The frontend Git history is retained in this repository. The backend was
reimplemented from the upstream HTTP/storage behavior to remove duplicate and
unsafe code while preserving attribution here and in `THIRD_PARTY_NOTICES.md`.
