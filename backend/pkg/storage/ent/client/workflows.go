package client

import (
	"context"

	"github.com/flacatus/qe-dashboard-backend/pkg/storage"
	"github.com/flacatus/qe-dashboard-backend/pkg/storage/ent/db/repository"
	"github.com/flacatus/qe-dashboard-backend/pkg/storage/ent/db/workflows"
	"github.com/google/uuid"
)

// CreateRepository save provided repository information in database.
func (d *Database) CreateWorkflows(workflow storage.GithubWorkflows, repo_id uuid.UUID) error {
	w, err := d.client.Workflows.Create().
		SetWorkflowName(workflow.WorkflowName).
		SetBadgeURL(workflow.BadgeURL).
		SetHTMLURL(workflow.HTMLURL).
		SetJobURL(workflow.JobURL).
		SetState(workflow.State).
		Save(context.TODO())
	if err != nil {
		return convertDBError("create workflows: %w", err)
	}
	_, err = d.client.Repository.UpdateOneID(repo_id).AddWorkflows(w).Save(context.TODO())
	if err != nil {
		return convertDBError("create workflows: %w", err)
	}
	return nil
}

func (d *Database) ReCreateWorkflow(workflow storage.GithubWorkflows, repoName string) error {
	_, err := d.client.Workflows.Delete().Where(workflows.WorkflowName(workflow.WorkflowName)).Exec(context.TODO())
	if err != nil {
		return convertDBError("delete workflow from database: %w", err)
	}

	w, err := d.client.Workflows.Create().
		SetWorkflowName(workflow.WorkflowName).
		SetBadgeURL(workflow.BadgeURL).
		SetHTMLURL(workflow.HTMLURL).
		SetJobURL(workflow.JobURL).
		SetState(workflow.State).
		Save(context.TODO())
	if err != nil {
		return convertDBError("create workflows: %w", err)
	}
	_, err = d.client.Repository.Update().Where(repository.RepositoryName(repoName)).AddWorkflows(w).Save(context.TODO())
	if err != nil {
		return convertDBError("create workflows: %w", err)
	}
	return nil
}
