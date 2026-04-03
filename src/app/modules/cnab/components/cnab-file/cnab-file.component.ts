import { Component } from '@angular/core';
import { CnabService } from '../../services/cnab/cnab.service';

@Component({
  selector: 'app-cnab-file',
  standalone: false,
  templateUrl: './cnab-file.component.html',
  styleUrl: './cnab-file.component.scss',
})
export class CnabFileComponent {
  public selectedFile: File | null = null;
  public isLoading = false;
  public uploadMessage = '';
  public isError = false;

  constructor(private cnabService: CnabService) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.uploadMessage = '';
      this.isError = false;
    }
  }

  onUpload(): void {
    if (!this.selectedFile) return;

    this.isLoading = true;
    this.uploadMessage = 'Processing file...';
    this.isError = false;

    this.cnabService.uploadCnabFile(this.selectedFile).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.isError = false;
        this.uploadMessage = `Success! ${res.totalProcessed} transactions processed.`;
        this.selectedFile = null;
      },
      error: (err) => {
        this.isLoading = false;
        this.isError = true;
        this.uploadMessage =
          err.error?.message || 'Error processing the CNAB file.';
        console.error('Upload error:', err);
      },
    });
  }
}
