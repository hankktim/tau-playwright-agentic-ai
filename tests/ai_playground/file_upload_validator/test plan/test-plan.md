# File Upload Validator Test Plan

## Application Overview

Test challenge 13, File Upload Validator, on https://webdriveruniversity.com/AI-Playground/index.html. Each scenario starts in a fresh page with no file selected. The file control advertises .jpg, .jpeg, .png, and .pdf. Observed validation accepts MIME types image/jpeg, image/png, and application/pdf when the file is no larger than 2,097,152 bytes; it rejects other MIME types and files larger than that limit. An accepted file displays its name, size in KB (one decimal place), and MIME type. An empty submission displays “No file selected.” Validation occurs in the browser and shows “File accepted”; this challenge does not verify server-side transfer. The observed implementation checks MIME type and size, not the filename extension, and accepts a zero-byte file when its MIME type is allowed. Prepare deterministic fixtures for each case, including precise byte lengths and MIME types, and assert the visible result/error state rather than stale hidden content.

## Test Scenarios

### 1. File Upload Validator

**Seed:** `tests/seed.spec.ts`

#### 1.1. Verify Empty Submission Is Rejected

**File:** `tests/ai_playground/file_upload_validator/tests/verify-empty-submission-is-rejected.test.ts`

**Steps:**
  1. Open the AI Testing Playground in a fresh page and locate challenge 13, File Upload Validator. Do not select a file.
    - expect: The file chooser and “Validate & Upload” button are visible.
    - expect: No validation result or error is visible before submission.
  2. Click “Validate & Upload” without selecting a file.
    - expect: The error “No file selected.” becomes visible.
    - expect: No “File accepted” result is visible.

#### 1.2. Verify JPG And JPEG Files Are Accepted

**File:** `tests/ai_playground/file_upload_validator/tests/verify-jpeg-files-are-accepted.test.ts`

**Steps:**
  1. Open the playground in a fresh page and locate the File Upload Validator. Select a small valid JPEG fixture named sample.jpg with MIME type image/jpeg, then click “Validate & Upload”.
    - expect: The result shows “File accepted”.
    - expect: The displayed name is sample.jpg, the size is shown in KB to one decimal place, and the type is image/jpeg.
    - expect: No validation error is visible.
  2. Replace the selected file with a small valid JPEG fixture named sample.jpeg with MIME type image/jpeg, then submit again.
    - expect: The result shows “File accepted” and displays sample.jpeg with type image/jpeg.
    - expect: No validation error is visible.

#### 1.3. Verify PNG Files Are Accepted

**File:** `tests/ai_playground/file_upload_validator/tests/verify-png-files-are-accepted.test.ts`

**Steps:**
  1. Open the playground in a fresh page and locate the File Upload Validator. Select a small valid PNG fixture named sample.png with MIME type image/png, then click “Validate & Upload”.
    - expect: The result shows “File accepted”.
    - expect: The displayed name is sample.png, the size is shown in KB to one decimal place, and the type is image/png.
    - expect: No validation error is visible.

#### 1.4. Verify PDF Files Are Accepted

**File:** `tests/ai_playground/file_upload_validator/tests/verify-pdf-files-are-accepted.test.ts`

**Steps:**
  1. Open the playground in a fresh page and locate the File Upload Validator. Select a small valid PDF fixture named sample.pdf with MIME type application/pdf, then click “Validate & Upload”.
    - expect: The result shows “File accepted”.
    - expect: The displayed name is sample.pdf, the size is shown in KB to one decimal place, and the type is application/pdf.
    - expect: No validation error is visible.

#### 1.5. Verify Unsupported MIME Type Is Rejected

**File:** `tests/ai_playground/file_upload_validator/tests/verify-unsupported-mime-type-is-rejected.test.ts`

**Steps:**
  1. Open the playground in a fresh page and locate the File Upload Validator. Select a small text fixture named notes.txt with MIME type text/plain, then click “Validate & Upload”.
    - expect: The error reads “Invalid file type: \"text/plain\". Only .jpg, .png, .pdf allowed.”
    - expect: No “File accepted” result is visible.

#### 1.6. Verify File At The Maximum Size Is Accepted

**File:** `tests/ai_playground/file_upload_validator/tests/verify-file-at-maximum-size-is-accepted.test.ts`

**Steps:**
  1. Open the playground in a fresh page and locate the File Upload Validator. Select a valid PNG fixture with MIME type image/png and an exact size of 2,097,152 bytes, then click “Validate & Upload”.
    - expect: The result shows “File accepted”.
    - expect: The displayed size is 2048.0 KB and the displayed type is image/png.
    - expect: No validation error is visible.

#### 1.7. Verify File Over The Maximum Size Is Rejected

**File:** `tests/ai_playground/file_upload_validator/tests/verify-file-over-maximum-size-is-rejected.test.ts`

**Steps:**
  1. Open the playground in a fresh page and locate the File Upload Validator. Select a valid PNG fixture with MIME type image/png and a size of 2,097,153 bytes, then click “Validate & Upload”.
    - expect: The error reads “File too large: 2.00 MB. Maximum 2 MB.”
    - expect: No “File accepted” result is visible.

#### 1.8. Verify Zero-Byte File Behavior

**File:** `tests/ai_playground/file_upload_validator/tests/verify-zero-byte-file-behavior.test.ts`

**Steps:**
  1. Open the playground in a fresh page and locate the File Upload Validator. Select an empty fixture named empty.png with MIME type image/png and a size of zero bytes, then click “Validate & Upload”.
    - expect: The observed validator shows “File accepted”.
    - expect: The result displays empty.png, size 0.0 KB, and type image/png.
    - expect: No validation error is visible.

#### 1.9. Verify MIME Type Rather Than Extension Controls Validation

**File:** `tests/ai_playground/file_upload_validator/tests/verify-mime-type-not-extension-controls-validation.test.ts`

**Steps:**
  1. Open the playground in a fresh page and locate the File Upload Validator. Select a small fixture named mislabeled.jpg with MIME type text/plain, then click “Validate & Upload”.
    - expect: The file is rejected with the unsupported-type message for text/plain despite the .jpg extension.
    - expect: No “File accepted” result is visible.
  2. Replace it with a small fixture named image-as-text.txt with MIME type image/png, then submit.
    - expect: The observed validator accepts the file because its MIME type is image/png despite the .txt extension.
    - expect: The result displays image-as-text.txt and type image/png.
    - expect: No validation error is visible.

#### 1.10. Verify Result And Error Update After Resubmission

**File:** `tests/ai_playground/file_upload_validator/tests/verify-result-and-error-update-after-resubmission.test.ts`

**Steps:**
  1. Open the playground in a fresh page and locate the File Upload Validator. Submit a small valid PNG fixture with MIME type image/png.
    - expect: The “File accepted” result is visible.
    - expect: No validation error is visible.
  2. Replace it with a small unsupported text/plain fixture and submit again.
    - expect: The unsupported file-type error is visible.
    - expect: The previous accepted result is hidden.
  3. Replace it with a small valid PDF fixture with MIME type application/pdf and submit again.
    - expect: The “File accepted” result is visible with the PDF name and MIME type.
    - expect: The previous validation error is hidden.
