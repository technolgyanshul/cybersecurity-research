graph TD
    %% --- Style Definitions ---
    classDef storage fill:#e6f3ff,stroke:#0066cc,stroke-width:2px
    classDef process fill:#e6ffee,stroke:#009933,stroke-width:2px
    classDef engine fill:#fff2e6,stroke:#ff8c1a,stroke-width:2px
    classDef output fill:#f2e6ff,stroke:#8000ff,stroke-width:2px

    %% --- Subgraph 1: Data Ingestion & Preprocessing Pipeline ---
    subgraph Data Ingestion & Preprocessing Pipeline
        A1[("Raw Datasets
        (pcap/csv files)")]:::storage
        A2["Feature Engineering & Extraction Module"]:::process
        A3["Data Normalization & Scaling Module"]:::process
        A4["Train/Test Splitter"]:::process
        A5[("Processed Datasets
        (Train & Test Splits)")]:::storage

        A1 --> A2 --> A3 --> A4 --> A5
    end

    %% --- Subgraph 2: Model Training & Registry ---
    subgraph Model Training & Registry
        B1["Model Training Orchestrator"]:::process
        B2["XGBoost Trainer"]:::process
        B3["MLP (Keras/PyTorch) Trainer"]:::process
        B4[("Model Registry
        (Stored .pkl & .h5 files)")]:::storage

        B1 --> B2 & B3
        B2 --> B4
        B3 --> B4
    end

    %% --- Subgraph 3: XAI Analysis Engine ---
    subgraph XAI Analysis Engine
        C1["Inference Module"]:::engine
        C2{"Prediction Comparator
        (Filter for co-classified attacks)"}:::engine
        C3["SHAP Explainer Module"]:::engine
        C4["Consistency Analyzer
        (Jaccard Index Logic)"]:::engine
        C5[("Results Database
        (Consistency Scores)")]:::storage

        C1 --> C2 --> C3 --> C4 --> C5
    end

    %% --- Subgraph 4: Reporting & Visualization ---
    subgraph Reporting & Visualization
        D1["Metrics Query Engine"]:::process
        D2["Plotting & Aggregation Module"]:::process
        D3[/"Analysis Report
        (Figures & Tables)"/]:::output

        D1 --> D2 --> D3
    end

    %% --- System-Wide Data Flow ---
    A5 -- Train Data --> B1
    A5 -- Test Data --> C1
    B4 -- Trained Models --> C1
    C5 -- Stored Results --> D1
