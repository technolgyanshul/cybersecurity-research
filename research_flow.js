graph TD
    %% Define Styles for different block types
    classDef dataset fill:#e6f3ff,stroke:#0066cc,stroke-width:2px
    classDef model fill:#fff2e6,stroke:#ff8c1a,stroke-width:2px
    classDef core_method fill:#e6ffee,stroke:#009933,stroke-width:2px
    classDef result fill:#f2e6ff,stroke:#8000ff,stroke-width:2px

    %% Phase 1: Data Preparation
    subgraph Data Preparation
        A["Start with Datasets
        - CIC-IDS2017
        - CSE-CIC-IDS2018
        - CIC-DoS2017
        - CIC-DDoS2019"]:::dataset
        B["Preprocess Data
        (Clean, Scale, Standardize Features)"]
        C["Split Data
        (Training & Test Sets for each dataset)"]
        A --> B --> C
    end

    %% Phase 2: Model Training & Evaluation (Parallel Paths)
    subgraph Model Training & Evaluation
        C --> Train_XGBoost
        C --> Train_MLP

        subgraph Tree-Based Ensemble Path
            Train_XGBoost["Train XGBoost Model
            on Training Set"]:::model
            Eval_XGBoost["Evaluate XGBoost Performance
            (Accuracy, Precision, Recall, F1)"]:::model
            Train_XGBoost --> Eval_XGBoost
        end
        
        subgraph Neural Network Path
            Train_MLP["Train MLP Model
            on Training Set"]:::model
            Eval_MLP["Evaluate MLP Performance
            (Accuracy, Precision, Recall, F1)"]:::model
            Train_MLP --> Eval_MLP
        end
    end

    %% Phase 3: Selection & Explanation
    subgraph Explainability Setup
        Eval_XGBoost & Eval_MLP --> D["Performance Checkpoint
        Confirm models have high and
        comparable accuracy"]
        D --> E["Select Test Instances
        Filter for attack instances
        correctly classified by BOTH models"]
        E --> F["Generate Explanations
        Apply SHAP to selected instances
        for both XGBoost and MLP"]
    end

    %% Phase 4: Core Contribution - Consistency Analysis
    subgraph Consistency Analysis
        F --> G["Calculate Consistency Metric per Instance
        1. For each model, rank features by absolute SHAP value
        2. Select the Top-10 most important features (S_xgb, S_mlp)
        3. Compute Jaccard Index: |S_xgb ∩ S_mlp| / |S_xgb ∪ S_mlp|"]:::core_method
        G --> H["Generate Consistency Score
        (A score from 0 to 1 for each instance)"]:::core_method
    end

    %% Phase 5: Final Results
    subgraph Results & Conclusion
        H --> I["Aggregate Scores
        Compile consistency scores from all instances"]
        I --> J["Analyze Score Distribution
        - Overall analysis
        - Analysis segmented by Attack Type"]
        J --> K["Final Findings & Conclusion
        - Quantified evidence of inconsistency
        - Discussion of implications for SOCs"]:::result
    end
