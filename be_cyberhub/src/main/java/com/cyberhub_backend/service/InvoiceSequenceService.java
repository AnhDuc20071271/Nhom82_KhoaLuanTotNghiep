package com.cyberhub_backend.service;

import com.cyberhub_backend.model.InvoiceSequence;
import com.cyberhub_backend.repository.InvoiceSequenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvoiceSequenceService {

    @Autowired
    private InvoiceSequenceRepository invoiceSequenceRepository;

    public List<InvoiceSequence> getAllInvoiceSequences() {
        return invoiceSequenceRepository.findAll();
    }

    public InvoiceSequence createInvoiceSequence(InvoiceSequence invoiceSequence) {
        return invoiceSequenceRepository.save(invoiceSequence);
    }
}
