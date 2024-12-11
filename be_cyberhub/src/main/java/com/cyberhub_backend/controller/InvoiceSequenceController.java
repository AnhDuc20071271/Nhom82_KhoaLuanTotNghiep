package com.cyberhub_backend.controller;

import com.cyberhub_backend.model.InvoiceSequence;
import com.cyberhub_backend.service.InvoiceSequenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/invoiceSequence")
public class InvoiceSequenceController {

    @Autowired
    private InvoiceSequenceService invoiceSequenceService;

    @GetMapping
    public ResponseEntity<List<InvoiceSequence>> getAllInvoiceSequences() {
        return ResponseEntity.ok(invoiceSequenceService.getAllInvoiceSequences());
    }

    @PostMapping
    public ResponseEntity<InvoiceSequence> createInvoiceSequence(@RequestBody InvoiceSequence invoiceSequence) {
        return ResponseEntity.ok(invoiceSequenceService.createInvoiceSequence(invoiceSequence));
    }
}
